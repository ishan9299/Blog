# Generated by Django 5.0.6 on 2024-07-14 07:28

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_app', '0002_markdowncontent_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='markdowncontent',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date published'),
        ),
    ]
