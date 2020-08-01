import pandas as pd
import numpy as np
import seaborn as sns

def func():
   data = pd.read_csv("datasets/password_strength.csv",',',error_bad_lines=False)