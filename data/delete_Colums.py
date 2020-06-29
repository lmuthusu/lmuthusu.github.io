import os
import glob
import pandas as pd
os.chdir('enterpath')
output_dir = 'enteroutputdir'
for file in glob.glob("*.csv"):
	df = pd.read_csv(file)
	dropped=df.drop(df.columns[[1, 2, 3, 4]], axis=1)
	dropped.to_csv(output_dir+str(file), index=False)
	print(df)
	print(dropped)
