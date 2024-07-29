import markdown
from django.shortcuts import render, get_object_or_404
from .models import MarkdownContent

def home_page(request):
    return render(request, "blog_app/home.html")

def list_articles(request):
    articles = MarkdownContent.objects.values_list('title', 'slug', 'created')
    articles = articles.order_by('-created')
    context = {"articles": articles}
    return render(request, "blog_app/list_articles.html", context=context)

def markdown_content_view(request, slug):
    markdown_content = get_object_or_404(MarkdownContent, slug=slug)
    context = {"markdown_content": markdown_content}
    return render(request, "blog_app/markdown_content.html", context=context)

def projects_view(request):
    return render(request, "blog_app/projects.html")
