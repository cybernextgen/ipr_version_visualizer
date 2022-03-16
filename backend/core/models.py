from tabnanny import verbose
from django.db import models


class Period(models.Model):
    """
    Интервал планирования
    """
    name = models.CharField(max_length=255, verbose_name='Название')
    comment = models.CharField(max_length=255, verbose_name='Комментарий', blank=True, null=True)
    created_datetime = models.DateTimeField(auto_now_add=True, verbose_name='Отметка времени создания объекта')
    flowchart_json = models.TextField(verbose_name='Данные диаграммы', blank=True, null=True)

    class Meta:
        verbose_name = 'Интервал планирования'
        verbose_name_plural = 'Интервалы планирования'
