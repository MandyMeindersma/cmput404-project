from rest_framework import routers

from core.users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet)
urlpatterns = router.urls
