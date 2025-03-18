import geopandas as gpd
import pandas as pd
import os
from tqdm import tqdm

DIR = os.path.dirname(__file__)
PATH = os.path.join(DIR, 'eu.csv')

# data\GeoJSON\europe.geojson
PATH_BORDERS = os.path.join(DIR, '..', 'GeoJSON', 'europe.geojson')

SAVEPATH = os.path.join(DIR, 'Norway_UK_2022.geojson')
SAVEPATH2 = os.path.join(DIR, 'Norway_UK_2022.csv')

if __name__ == '__main__':
    # 加载 边界数据
    borders = gpd.read_file(PATH_BORDERS)
    # 打印列
    # print(borders['NAME']) # United Kingdom, Norway

    # 加载数据
    # data = gpd.read_file(PATH) 
    # ID,lat,lon,geometry
    # 指定 geometry 为 Point 同时设置坐标系为 EPSG:4326
    data = pd.read_csv(PATH)
    data = gpd.GeoDataFrame(data, geometry=gpd.points_from_xy(data.lon, data.lat))
    data.crs = 'EPSG:4326'

    # 设置坐标系 为 EPSG:4326 
    # 打印列
    # print(data.columns) # Index(['Country', 'Capital', 'Latitude', 'Longitude'], dtype='object')

    tqdm.pandas()

    # 仅仅提取落在 United Kingdom, Norway 的点
    data = gpd.sjoin(data, borders, how='inner', op='within')

    # 保存为 csv
    data.to_csv(SAVEPATH2, index=False)

    # 保存为 geojson
    data.to_file(SAVEPATH, driver='GeoJSON')

