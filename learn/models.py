from django.db import models

# Create your models here.


class User(models.Model):
    userName = models.CharField(max_length=30)
    headImg = models.FileField(upload_to='./upload/')

    def __unicode__(self):
        return self.userName
