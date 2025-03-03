# 处理 2024 年人口数据
# 文件夹结构
# data/population/
# ├── C
# │   ├── cn.json # 2022 年数据
# │   ├── cn_with_v.json
# │   ├── eu.json
# │   ├── eu_with_v.json
# │   ├── us.json
# │   └── us_with_v.json
# ├── china_evcs_pop.csv
# ├── china_evcs_pop_groupby.csv
# ├── europe_evcs_pop.csv
# ├── europe_evcs_pop_groupby.csv
# ├── usa_evcs_pop.csv
# └── usa_evcs_pop_groupby.csv


import pandas as pd
from tqdm import tqdm
import os

import geopandas as gpd


# china_evcs_pop.csv
DIR = os.path.dirname(os.path.abspath(__file__))

# 1. cn
PATH = os.path.join(DIR, 'china_evcs_pop.csv')
SAVE_PATH = os.path.join(DIR, 'china_evcs_pop_groupby.csv')
PATH_JSON = os.path.join(DIR, 'C', 'cn_2024.json')

# 2. us NAME_2
PATH2 = os.path.join(DIR, 'usa_evcs_pop.csv')
SAVE_PATH2 = os.path.join(DIR, 'usa_evcs_pop_groupby.csv')
PATH_JSON2 = os.path.join(DIR, 'C', 'us_2024.json')

# 3. eu NAME_2
# 2. us NAME_2
PATH3 = os.path.join(DIR, 'europe_evcs_pop.csv')
SAVE_PATH3 = os.path.join(DIR, 'europe_evcs_pop_groupby.csv')
PATH_JSON3 = os.path.join(DIR, 'C', 'eu_2024.json')

# 后处理 读取所有 geojson 文件，将 V 值中的 null 替换为 0
def post_process():
    pdf_cn = gpd.read_file(PATH_JSON)
    pdf_us = gpd.read_file(PATH_JSON2)
    pdf_eu = gpd.read_file(PATH_JSON3)

    pdf_cn['V'] = pdf_cn['V'].fillna(0)
    pdf_us['V'] = pdf_us['V'].fillna(0)
    pdf_eu['V'] = pdf_eu['V'].fillna(0)

    pdf_cn.to_file(PATH_JSON, driver='GeoJSON')
    pdf_us.to_file(PATH_JSON2, driver='GeoJSON')
    pdf_eu.to_file(PATH_JSON3, driver='GeoJSON')


def group_cn():
    df = pd.read_csv(PATH)
    # group by 地名 求取 V 的均值

    df = df[['地名', 'V']]
    df = df.groupby('地名').mean().reset_index()
    # 最终仅仅保留地名和 V
    df = df[['地名', 'V']]
    df.to_csv(SAVE_PATH, index=False)

def merige_cn():
    gdf = gpd.read_file(PATH_JSON)
    df = pd.read_csv(SAVE_PATH)

    # 找到 gdf 中与 df 中地名相同的行，将 V 的值赋值给 gdf 中的 V
    gdf = gdf.drop(columns=['V'], errors='ignore')  # 先删除旧的 V，防止合并时重命名
    gdf = gdf.merge(df[['地名', 'V']], on='地名', how='left')
    # null 值填充为 0
    gdf['V'] = gdf['V'].fillna(0)

    gdf.to_file(os.path.join(DIR, 'C', 'cn_with_v.json'), driver='GeoJSON')

def group_us():
    df = pd.read_csv(PATH2)
    # group by 地名 求取 V 的均值

    df = df[['NAME_2', 'V']]
    df = df.groupby('NAME_2').mean().reset_index()
    # 最终仅仅保留地名和 V
    df = df[['NAME_2', 'V']]
    df.to_csv(SAVE_PATH2, index=False)

def merige_us():
    gdf = gpd.read_file(PATH_JSON2)
    df = pd.read_csv(SAVE_PATH2)

    # 找到 gdf 中与 df 中地名相同的行，将 V 的值赋值给 gdf 中的 V
    gdf = gdf.drop(columns=['V'], errors='ignore')  # 先删除旧的 V，防止合并时重命名
    gdf = gdf.merge(df[['NAME_2', 'V']], on='NAME_2', how='left')

    # null 值填充为 0
    gdf['V'] = gdf['V'].fillna(0)

    gdf.to_file(os.path.join(DIR, 'C', 'us_with_v.json'), driver='GeoJSON')

def group_eu():
    df = pd.read_csv(PATH3)
    # group by 地名 求取 V 的均值

    df = df[['NAME_2', 'V']]
    df = df.groupby('NAME_2').mean().reset_index()
    # 最终仅仅保留地名和 V
    df = df[['NAME_2', 'V']]
    df.to_csv(SAVE_PATH3, index=False)

def merige_eu():
    gdf = gpd.read_file(PATH_JSON3)
    df = pd.read_csv(SAVE_PATH3)

    # 找到 gdf 中与 df 中地名相同的行，将 V 的值赋值给 gdf 中的 V
    gdf = gdf.drop(columns=['V'], errors='ignore')  # 先删除旧的 V，防止合并时重命名
    gdf = gdf.merge(df[['NAME_2', 'V']], on='NAME_2', how='left')

    # null 值填充为 0
    gdf['V'] = gdf['V'].fillna(0)

    gdf.to_file(os.path.join(DIR, 'C', 'eu_with_v.json'), driver='GeoJSON')

if __name__ == "__main__":
    pass
    # group_cn()
    # merige_cn()

    # group_us()
    # merige_us()

    # group_eu()
    # merige_eu()

    # post_process() # 后处理