# Generated by Django 3.1.7 on 2021-03-25 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('speedcheck', '0002_auto_20210325_0906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userscore',
            name='type_accuracy',
            field=models.CharField(default='0%', max_length=5),
        ),
        migrations.AlterField(
            model_name='userscore',
            name='type_speed',
            field=models.IntegerField(default=0),
        ),
    ]
