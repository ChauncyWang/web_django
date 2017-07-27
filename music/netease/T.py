import sys

from PyQt5.QtWidgets import QApplication, QWidget

from music.netease import api
from music.ui import MyWidget

from music.ui.untitled import Ui_Form

a = api.Crawler().search_artists("因为爱情", 0, 20)
print(a)

"""
app = QApplication(sys.argv)
w = QWidget()
Ui_Form().setupUi(w)
w.show()
sys.exit(app.exec_())

app = QApplication(sys.argv)
w = MyWidget.ProcessBar()
w.show()
sys.exit(app.exec_())

"""