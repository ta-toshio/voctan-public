from sqlalchemy.engine import create_engine
import sqlalchemy

from models import WordModel


# SQLiteからMySQLへのデータ移行
def import_word(app):
    # SQLiteデータベースへの接続
    sqlite_engine = create_engine('sqlite:///./ejdict.sqlite3')

    # MySQLデータベースへの接続
    mysql_engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

    # Assuming the structure of "items" table and "word_ejdict" table are compatible for direct insert
    insert_query = "INSERT INTO word_ejdict (word, mean, level, ext_id) VALUES (?, ?, ?, ?)"

    # SQLiteからMySQLへのデータコピー
    with sqlite_engine.connect() as sqlite_conn, mysql_engine.connect() as mysql_conn:
        result = sqlite_conn.execute(sqlalchemy.text("SELECT * FROM items"))
        batch_size = 100
        while True:
            rows = result.fetchmany(batch_size)
            if not rows:
                break

            # rows_to_insert = [(str(row[1]), str(row[2]), int(row[3]), int(row[0])) for row in rows]
            rows_to_insert = [{
                'word': str(row[1]),
                'mean': str(row[2]),
                'level': int(row[3]),
                # 'ext_id': int(row[0])
            } for row in rows]

            # Here we use execute with multiple sets of parameters for bulk insert
            mysql_conn.execute(WordModel.__table__.insert(), rows_to_insert)
            mysql_conn.commit()

            print(f"{len(rows_to_insert)} rows inserted.")

    print("Data migration completed.")
