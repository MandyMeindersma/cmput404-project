from rest_framework import routers

from core.authors.views import AuthorViewSet

router = routers.DefaultRouter()
router.register(r'', AuthorViewSet)
urlpatterns = router.urls
