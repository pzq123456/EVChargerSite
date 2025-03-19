import geopandas as gpd
import os

DIR = os.path.dirname(__file__)
# PATH1 = os.path.join(DIR, 'eu.json')
PATH2 = os.path.join(DIR, 'eu_2024.json')

if __name__ == '__main__':
    gdf = gpd.read_file(PATH2, driver='GeoJSON')
    gdf = gdf.drop(columns = ['CC_2'])
    # 保存到原路径
    gdf.to_file(PATH2, driver='GeoJSON')