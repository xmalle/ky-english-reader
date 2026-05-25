#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成 questions 表插入 SQL 的脚本
"""
import re
import ast

def parse_ts_file(filepath):
    """解析 TypeScript 数据文件 - 使用 AST 解析"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []

    # 使用正则提取每个对象
    # 匹配 { year: ..., text_num: ..., ... }
    pattern = r'\{\s*year:\s*(\d+),\s*text_num:\s*"([^"]+)",\s*question_number:\s*(\d+),\s*question_text:\s*"((?:[^"\\]|\\.)*)",\s*option_a:\s*"((?:[^"\\]|\\.)*)",\s*option_b:\s*"((?:[^"\\]|\\.)*)",\s*option_c:\s*"((?:[^"\\]|\\.)*)",\s*option_d:\s*"((?:[^"\\]|\\.)*)",\s*correct_answer:\s*"([A-D])"\s*\}'

    matches = re.findall(pattern, content)

    for match in matches:
        year, text_num, q_num, q_text, opt_a, opt_b, opt_c, opt_d, correct = match
        questions.append({
            'year': int(year),
            'text_num': text_num,
            'question_number': int(q_num),
            'question_text': q_text.replace('\\"', '"'),
            'option_a': opt_a.replace('\\"', '"'),
            'option_b': opt_b.replace('\\"', '"'),
            'option_c': opt_c.replace('\\"', '"'),
            'option_d': opt_d.replace('\\"', '"'),
            'correct_answer': correct
        })

    return questions

def escape_sql(value):
    """转义 SQL 字符串"""
    if value is None:
        return 'NULL'
    # 转义单引号
    escaped = value.replace("'", "''")
    return f"'{escaped}'"

def generate_insert_sql(questions):
    """生成 SQL 插入语句 - 分批处理避免 SQL 过长"""
    sql_lines = [
        "-- 考研英语一阅读题目数据插入脚本",
        f"-- 共 {len(questions)} 道题目",
        f"-- 生成时间: 2026-05-25",
        "",
        "-- 使用 CTE 获取 passage_id 并插入题目",
    ]

    # 每批 50 题
    batch_size = 50
    batches = [questions[i:i+batch_size] for i in range(0, len(questions), batch_size)]

    for batch_idx, batch in enumerate(batches):
        sql_lines.append(f"\n-- 批次 {batch_idx + 1}/{len(batches)}")
        sql_lines.append("WITH passage_map AS (")
        sql_lines.append("  SELECT id, year, text_num FROM passages")
        sql_lines.append("),")
        sql_lines.append("insert_data AS (")

        values_list = []
        for q in batch:
            values_list.append(
                f"  SELECT {q['year']} as year, '{q['text_num']}' as text_num, "
                f"{q['question_number']} as question_number, "
                f"{escape_sql(q['question_text'])} as question_text, "
                f"{escape_sql(q['option_a'])} as option_a, "
                f"{escape_sql(q['option_b'])} as option_b, "
                f"{escape_sql(q['option_c'])} as option_c, "
                f"{escape_sql(q['option_d'])} as option_d, "
                f"'{q['correct_answer']}' as correct_answer"
            )

        sql_lines.append("\n  UNION ALL\n".join(values_list))
        sql_lines.append(")")
        sql_lines.append("")
        sql_lines.append("INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)")
        sql_lines.append("SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer")
        sql_lines.append("FROM insert_data d")
        sql_lines.append("JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num")
        sql_lines.append("ON CONFLICT (passage_id, question_number) DO UPDATE SET")
        sql_lines.append("  question_text = EXCLUDED.question_text,")
        sql_lines.append("  option_a = EXCLUDED.option_a,")
        sql_lines.append("  option_b = EXCLUDED.option_b,")
        sql_lines.append("  option_c = EXCLUDED.option_c,")
        sql_lines.append("  option_d = EXCLUDED.option_d,")
        sql_lines.append("  correct_answer = EXCLUDED.correct_answer;")

    return "\n".join(sql_lines)

def main():
    import os

    # 文件路径
    base_dir = r"C:\Users\86182\Desktop\claude\ky-english-reader\src\lib"
    file1 = os.path.join(base_dir, "questions-data-1.ts")
    file2 = os.path.join(base_dir, "questions-data-2.ts")

    print("正在读取题目数据...")

    # 解析两个数据文件
    questions_1 = parse_ts_file(file1)
    questions_2 = parse_ts_file(file2)

    all_questions = questions_1 + questions_2

    print(f"数据1: {len(questions_1)} 题")
    print(f"数据2: {len(questions_2)} 题")
    print(f"总计: {len(all_questions)} 题")

    if all_questions:
        print(f"\n样例: {all_questions[0]}")

        # 生成 SQL
        print("\n正在生成 SQL...")
        sql = generate_insert_sql(all_questions)

        # 保存到文件
        output_path = r"C:\Users\86182\.trae-cn\work\6a143f79dbda38eae4f3670a\insert-questions.sql"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(sql)

        file_size = os.path.getsize(output_path)
        print(f"\n✅ SQL 文件已生成: {output_path}")
        print(f"文件大小: {file_size / 1024:.2f} KB")
    else:
        print("\n❌ 未解析到任何题目数据")

if __name__ == "__main__":
    main()
