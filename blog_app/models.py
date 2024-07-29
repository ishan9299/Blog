from django.db import models
from django.utils import timezone

# Create your models here.

class MarkdownContent(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    slug = models.SlugField(blank=True)
    created = models.DateTimeField("date published", default=timezone.now)

    class Meta:
        verbose_name_plural = "Markdown content"

    def __str__(self):
        return self.title
