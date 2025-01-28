# ベースイメージとしてPythonとNode.jsを含むイメージを使用
FROM python:3.10-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apt-get update && apt-get install -y curl gcc build-essential && rm -rf /var/lib/apt/lists/*

# Node.jsをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# プロジェクトのファイルをコピー
COPY . .

# Pythonの依存関係をインストール
RUN pip install --no-cache-dir -r scatter/requirements.txt

# JavaScriptの依存関係をインストール
RUN cd scatter/next-app && npm install

# NLTKのデータをダウンロード
RUN python -c "import nltk; nltk.download('stopwords')"

# 環境変数を設定
ENV OPENAI_API_KEY=your_openai_api_key_here

# パイプラインを実行し、レポートを生成
CMD ["bash", "-c", "cd scatter/pipeline && python main.py configs/example-polis.json --skip-interaction && cd outputs/example-polis/report && python -m http.server 8000"]