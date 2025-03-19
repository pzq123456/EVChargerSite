import geopandas as gpd
import pandas as pd
import os
from tqdm import tqdm
import zipfile

# 定义文件路径
DIR = os.path.dirname(__file__)
PATH = os.path.join(DIR, 'eu.csv')
PATH_BORDERS = os.path.join(DIR, '..', 'GeoJSON', 'europe.geojson')
SAVEPATH_GEOJSON = os.path.join(DIR, 'Norway_UK_2022.geojson')
SAVEPATH_CSV = os.path.join(DIR, 'Norway_UK_2022.csv')
ZIP_PATH = os.path.join(DIR, 'Norway_UK_2022.zip')

def load_data():
    """加载边界数据和点数据"""
    # 加载边界数据
    borders = gpd.read_file(PATH_BORDERS)
    # 确保边界数据的坐标系为 EPSG:4326
    borders = borders.to_crs('EPSG:4326')
    
    # 加载点数据
    data = pd.read_csv(PATH)
    # 将点数据转换为 GeoDataFrame，并设置坐标系为 EPSG:4326
    data = gpd.GeoDataFrame(data, geometry=gpd.points_from_xy(data.lon, data.lat))
    data.crs = 'EPSG:4326'
    
    return borders, data

def filter_points_in_countries(borders, data, countries):
    """过滤出落在指定国家边界内的点"""
    # 过滤边界数据，仅保留指定国家
    borders = borders[borders['NAME'].isin(countries)]
    
    # 使用 tqdm 显示进度条
    tqdm.pandas(desc="Filtering points within countries")
    
    # 执行空间连接，保留落在边界内的点
    filtered_data = gpd.sjoin(data, borders, how='inner', op='within')
    
    return filtered_data

def save_data(data, savepath_geojson, savepath_csv):
    """保存过滤后的数据为 GeoJSON 和 CSV 文件"""
    # 只保留 ID, lat, lon 和 geometry 列
    data = data[['ID', 'lat', 'lon', 'geometry']]
    
    # 保存为 CSV
    data.to_csv(savepath_csv, index=False)
    # 保存为 GeoJSON
    data.to_file(savepath_geojson, driver='GeoJSON')

def zip_files(zip_path, *files):
    """将文件打包为 ZIP 文件"""
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for file in files:
            zipf.write(file, os.path.basename(file))
    print(f"文件已打包到 {zip_path}")

def cleanup_files(*files):
    """清理临时文件"""
    for file in files:
        if os.path.exists(file):
            os.remove(file)
    print("临时文件已清理")

if __name__ == '__main__':
    # 加载数据
    borders, data = load_data()
    
    # 过滤出落在英国和挪威的点
    countries = ['United Kingdom', 'Norway']
    filtered_data = filter_points_in_countries(borders, data, countries)
    
    # 保存过滤后的数据
    save_data(filtered_data, SAVEPATH_GEOJSON, SAVEPATH_CSV)
    
    # 将文件打包为 ZIP
    zip_files(ZIP_PATH, SAVEPATH_GEOJSON, SAVEPATH_CSV)
    
    # 清理临时文件
    cleanup_files(SAVEPATH_GEOJSON, SAVEPATH_CSV)