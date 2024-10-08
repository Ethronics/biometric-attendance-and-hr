# Generated by Django 5.1 on 2024-08-25 13:28

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Employee', '0011_alter_employee_profile_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Performance',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('performance_rating', models.PositiveIntegerField(default=0)),
                ('feedback', models.CharField(max_length=100)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='performances', to='Employee.employee')),
                ('evaluator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluations', to='Employee.employee')),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]
