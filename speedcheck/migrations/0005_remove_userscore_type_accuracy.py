# Generated by Django 3.1.7 on 2021-03-25 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('speedcheck', '0004_remove_userscore_type_min'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userscore',
            name='type_accuracy',
        ),
    ]
