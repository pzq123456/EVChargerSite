import os
import pandas as pd
from tqdm import tqdm

DIR = os.path.dirname(__file__)

PATH1 = os.path.join(DIR, 'cn2024.csv')
PATH2 = os.path.join(DIR, 'us2024.csv')
PATH3 = os.path.join(DIR, 'eu2024.csv')

SAVE_PATH = os.path.join(DIR, 'output')

# 若无则创建输出文件夹
if not os.path.exists(SAVE_PATH):
    os.makedirs(SAVE_PATH)

def aggregate_points(file_path, save_path, resolution=0.05):
    # 读取数据
    data = pd.read_csv(file_path)
    
    # 计算每个点所属的网格
    data['grid_lat'] = (data['lat'] // resolution) * resolution
    data['grid_lon'] = (data['lon'] // resolution) * resolution
    
    # 统计每个网格内的点数
    aggregated = data.groupby(['grid_lat', 'grid_lon']).size().reset_index(name='count')
    
    # 保存结果
    file_name = os.path.basename(file_path).replace('.csv', '_aggregated.csv')
    aggregated.to_csv(os.path.join(save_path, file_name), index=False)
    print(f"Aggregated data saved to {os.path.join(save_path, file_name)}")

if __name__ == '__main__':
    tqdm.pandas()
    for path in [PATH1, PATH2, PATH3]:
        if os.path.exists(path):
            aggregate_points(path, SAVE_PATH, resolution=0.01)