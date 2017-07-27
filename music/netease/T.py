import sys

from PyQt5.QtWidgets import QApplication, QWidget

from music.netease import api
from music.ui import MyWidget, components

from music.ui.untitled import Ui_Form

app = QApplication(sys.argv)
w = components.PlayBar()
# w = MyWidget.ProcessBar()
w.show()
sys.exit(app.exec_())