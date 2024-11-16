import logging
import datetime
import os

class Log:
    def __init__(self, filename=None, level=logging.DEBUG):
        if not filename:
            logs_dir = os.path.join("\\".join(os.getcwd().split("\\")[:-1]), "logs")
            os.makedirs(logs_dir, exist_ok=True) 
            timestamp = str(datetime.datetime.now()).replace(':', '_')
            filename = os.path.join(logs_dir, f"{timestamp}.log")

        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(level)

        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

        # Create a file handler
        file_handler = logging.FileHandler(filename)
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

        # Create a console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)

    def debug(self, message):
        self.logger.debug("DEBUG : "+message)

    def info(self, message):
        self.logger.info("INFO : "+message)

    def warning(self, message):
        self.logger.warning("WARNING : "+message)

    def error(self, message):
        self.logger.error("ERROR : ",message)

    def fail(self, message):
        self.logger.error("FAILURE : "+message)

    def success(self,message):
        self.logger.info("Success : "+message)