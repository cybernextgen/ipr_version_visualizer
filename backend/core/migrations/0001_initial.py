# Generated by Django 4.0.3 on 2022-03-14 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Period',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('comment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Комментарий')),
                ('created_datetime', models.DateTimeField(auto_now_add=True, verbose_name='Отметка времени создания объекта')),
                ('flowchart_json', models.TextField(blank=True, null=True, verbose_name='Данные диаграммы')),
            ],
            options={
                'verbose_name': 'Интервал планирования',
                'verbose_name_plural': 'Интервалы планирования',
            },
        ),
    ]