from django.contrib import admin
from django.urls import path

from blog_app.views import home_page, list_articles, markdown_content_view, projects_view

urlpatterns = [
        path("", home_page, name="home_page"),
        path("blog/", list_articles, name="list_articles"),
        path("blog/<slug:slug>/", markdown_content_view, name="markdown_content"),
        path("projects/", projects_view, name="projects_view"),
]
