import os
import pandas as pd
from tqdm import tqdm

DIR = os.path.dirname(__file__)
PATH2 = os.path.join(DIR, 'us2024.csv')
PATH3 = os.path.join(DIR, 'eu2024.csv')
PATH4 = os.path.join(DIR, 'cn_mainland.csv')

# 合并所有csv为一个 all.csv
if __name__ == '__main__':
    try:
        # 读取所有CSV文件
        dataframes = []
        for path in tqdm([PATH2, PATH3, PATH4], desc="Reading CSV files"):
            df = pd.read_csv(path)
            dataframes.append(df)
        
        # 合并DataFrame
        combined_data = pd.concat(dataframes, ignore_index=True)
        
        # 保存合并后的数据到 all.csv
        output_path = os.path.join(DIR, 'all.csv')
        combined_data.to_csv(output_path, index=False)
        print(f"Data saved to {output_path}")
    
    except Exception as e:
        print(f"An error occurred: {e}")