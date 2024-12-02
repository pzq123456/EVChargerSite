import camelot
import os
import tqdm
import pandas as pd
import json

DIR = os.path.dirname(os.path.abspath(__file__))
# dataprocess\pdfs\Electric_vehicles-Tax_benefits_purchase_incentives_European_Union_2020.pdf

PATH = os.path.join(DIR, 'pdfs', 'Electric_vehicles-Tax_benefits_purchase_incentives_European_Union_2020.pdf')
SAVE_PATH = os.path.join(DIR, 'pdfs', 'policy.csv') 

import camelot

def pdf_to_csv(input_pdf_path, output_csv_path):
    # 读取 PDF 文件中的表格
    tables = camelot.read_pdf(input_pdf_path, pages='all', flavor='lattice', strip_text='\n')
    
    all_tables = []  # 用于存储所有表格的数据

    # 解析每个表格
    for i, table in tqdm.tqdm(enumerate(tables), desc="解析进度", total=len(tables)):
        print(f"解析报告（表格 {i+1}）：")
        print(table.parsing_report)
        # 打印表格的形状
        print(f"表格形状：{table.shape}")
        
        # 将每个表格的数据添加到 all_tables 列表中
        all_tables.append(table.df)

        # 保存每个表格为单独的 CSV 文件
        # table.to_csv(insert_index_to_filename(output_csv_path, i))
        print("保存单独的表格为 CSV 完成!")

    # 合并所有表格为一个大的 DataFrame
    combined_df = pd.concat(all_tables, ignore_index=True)

    # 输出合并后的表格到 CSV 文件
    combined_df.to_csv(output_csv_path, index=False)
    print(f"所有表格已合并并保存为：{output_csv_path}")



# 辅助函数 将索引插入文件名中
def insert_index_to_filename(file_path, index):
    file_dir = os.path.dirname(file_path)
    file_name = os.path.basename(file_path)
    file_name_no_ext, file_ext = os.path.splitext(file_name)
    new_file_name = f"{file_name_no_ext}_{index}{file_ext}"
    new_file_path = os.path.join(file_dir, new_file_name)
    return new_file_path

# 读取 csv 文件并将其导出为符合要求的json文件
def csv_to_json(input_csv_path, output_json_path):
    # 读取 CSV 文件
    df = pd.read_csv(input_csv_path)

    # 初始化字典，用于存储转换后的数据
    result = {}

    # 遍历每一行数据，按国家名进行字典分组
    for _, row in df.iterrows():
        country = row['COUNTRY']  # 假设国家列名是 'COUNTRY'
        country_data = {}  # 存储每个国家的相关数据
        
        # 遍历每一列（除去国家列），并将其添加到国家数据字典中
        for col in df.columns:
            if col != 'COUNTRY':  # 跳过国家列
                country_data[col] = row[col]
        
        # 将国家及其数据添加到结果字典中
        result[country] = country_data

    # 将结果字典导出为 JSON 文件
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(result, json_file, ensure_ascii=False, indent=4)

    print(f"已成功将 CSV 文件导出为 JSON 文件：{output_json_path}")
if __name__ == "__main__":

    # pdf_to_csv(PATH, SAVE_PATH)
    csv_to_json(SAVE_PATH, os.path.join(DIR, 'pdfs', 'policy.json'))

