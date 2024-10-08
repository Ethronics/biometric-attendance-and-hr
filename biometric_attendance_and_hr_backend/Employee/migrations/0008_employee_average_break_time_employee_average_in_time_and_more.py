# Generated by Django 5.1 on 2024-08-22 08:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0007_remove_employee_basic_salary'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='average_break_time',
            field=models.DurationField(default=datetime.timedelta(seconds=3600)),
        ),
        migrations.AddField(
            model_name='employee',
            name='average_in_time',
            field=models.TimeField(default=datetime.time(20, 0)),
        ),
        migrations.AddField(
            model_name='employee',
            name='average_out_time',
            field=models.TimeField(default=datetime.time(6, 0)),
        ),
        migrations.AddField(
            model_name='employee',
            name='average_working_hours',
            field=models.DurationField(default=datetime.timedelta(seconds=28800)),
        ),
        migrations.AddField(
            model_name='employee',
            name='basic_salary',
            field=models.DecimalField(decimal_places=2, default=123, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='role',
            field=models.CharField(choices=[('Immediate Director', 'Immediate Director'), ('Employee', 'Employee')], default=123, max_length=50),
            preserve_default=False,
        ),
    ]
