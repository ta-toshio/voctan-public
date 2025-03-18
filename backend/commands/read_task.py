from celery.result import AsyncResult


def read_task(task_id):
    # 非同期結果を取得
    async_result = AsyncResult(task_id)

    return async_result.result
