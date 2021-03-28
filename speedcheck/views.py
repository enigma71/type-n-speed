from django.shortcuts import render
from .models import userScore
from .forms import userNameForm
import itertools

# Create your views here.

def homepage(request):
    userName = str()
    userSpeed = int()
    if request.method == "POST":
        userName = request.POST.get('name')
        userSpeed = request.POST.get('type_speed')
        try:
            userScore.objects.create(name = userName, type_speed = userSpeed)
        except:
            pass
    return render(request, "home.html", {})


def leaderboard(request):
    top_scores = (userScore.objects.order_by('-type_speed').values_list('type_speed', flat=True).distinct())
    top_records = (userScore.objects.order_by('-type_speed').filter(type_speed__in=top_scores[:10]))
    top10 = itertools.islice(top_records, 10)
    context = {
        'objectSet' : top10
    }
    return render(request, "leaderboard.html", context)

def about(request):
    return render(request, "about.html", {})