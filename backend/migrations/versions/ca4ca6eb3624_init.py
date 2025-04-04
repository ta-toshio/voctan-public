"""init

Revision ID: ca4ca6eb3624
Revises: 
Create Date: 2024-10-02 00:06:30.778765

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca4ca6eb3624'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('email_verification',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('token', sa.String(length=500), nullable=False),
    sa.Column('expired_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_table('user',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('word',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('word', sa.String(length=80), nullable=False),
    sa.Column('mean', sa.Text(), nullable=True),
    sa.Column('level', sa.SmallInteger(), server_default='0', nullable=False),
    sa.Column('grade', sa.SmallInteger(), server_default='0', nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('document',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('type', sa.Enum('BOOK', 'VIDEO', 'TEXT', 'WEB', name='documenttype'), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_credential',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('chapter',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('document_id', sa.UUID(), nullable=False),
    sa.Column('index', sa.SmallInteger(), server_default='0', nullable=False),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.Column('title', sa.String(length=80), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['document_id'], ['document.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('document_import_status',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('document_id', sa.UUID(), nullable=False),
    sa.Column('file_path', sa.String(length=255), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'STARTING', 'STARTED', 'PROGRESS', 'COMPLETED', 'FAILED', name='documentstatus'), nullable=False),
    sa.Column('progress', sa.Integer(), server_default='0', nullable=False),
    sa.Column('progress_webhook', sa.Integer(), server_default='0', nullable=False),
    sa.Column('total_steps', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['document_id'], ['document.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('document_id')
    )
    op.create_table('document_import_error',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('document_id', sa.UUID(), nullable=False),
    sa.Column('chapter_id', sa.UUID(), nullable=True),
    sa.Column('message', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['chapter_id'], ['chapter.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['document_id'], ['document.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('document_word',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('document_id', sa.UUID(), nullable=False),
    sa.Column('word_id', sa.UUID(), nullable=True),
    sa.Column('my_word', sa.String(length=80), nullable=True),
    sa.Column('my_word_mean', sa.String(length=1000), nullable=True),
    sa.Column('index', sa.Integer(), server_default='0', nullable=False),
    sa.Column('chapter_id', sa.UUID(), nullable=True),
    sa.Column('word_raw', sa.String(length=80), nullable=False),
    sa.Column('example', sa.Text(), nullable=True),
    sa.Column('duplication', sa.Boolean(), nullable=False),
    sa.Column('passed', sa.Boolean(), nullable=False),
    sa.Column('passed_count', sa.SmallInteger(), server_default='0', nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['chapter_id'], ['chapter.id'], ),
    sa.ForeignKeyConstraint(['document_id'], ['document.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['word_id'], ['word.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('document_word')
    op.drop_table('document_import_error')
    op.drop_table('document_import_status')
    op.drop_table('chapter')
    op.drop_table('user_credential')
    op.drop_table('document')
    op.drop_table('word')
    op.drop_table('user')
    op.drop_table('email_verification')
    # ### end Alembic commands ###
