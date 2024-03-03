BULK INSERT Properties
from 'data_files/Properties-Table 1.csv'
with (firstrow = 2,
      fieldterminator = ',',
      rowterminator='\n',
      batchsize=10000,
      maxerrors=10);