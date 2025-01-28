# 初めてのTttC（Talk to the City）ガイド

## 概要

TttCは、コメントのCSVファイルを入力として受け取り、以下のようなHTMLレポートを生成するAIパイプラインです。

- 元のコメントから主要な議論を抽出
- 意味的な類似性に基づいて議論をクラスター化
- 各クラスターにラベルと要約を生成
- 各クラスター内の議論を探索するためのインタラクティブなマップを提供

TttCは、異なる種類のデータを取り込み、異なる言語でレポートを生成することができます。

## 必要なもの

- OpenAIのAPIキー
- PythonとJavaScriptを実行できるマシン
- コメントを含むCSVファイル

Python 3.10以上が必要です。Pythonのバージョン管理にはpyenvを使用することをお勧めします。

## セットアップ手順

1. **Python環境のセットアップ**
   - Python 3.10をインストールし、仮想環境を作成してアクティブ化します。
   - 必要な依存関係をインストールします。

   ```bash
   pyenv install 3.10.15
   pyenv local 3.10.15
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python -c "import nltk; nltk.download('stopwords')"
   ```

2. **JavaScript依存関係のインストール**
   - npmを使用してJavaScriptの依存関係をインストールします。

   ```bash
   cd next-app
   npm install
   ```

3. **レポートの生成**
   - サンプルの`example-polis`データを使用して試してみましょう。

   ```bash
   cd pipeline
   export OPENAI_API_KEY=sk-...
   python main.py configs/example-polis.json
   ```

   このコマンドは、`pipeline/inputs/example-polis.csv`のデータを使用し、`pipeline/outputs/example-polis/report`にレポートを生成します。

4. **レポートのビルドと表示**
   - Next.jsを使用してレポートをビルドします。

   ```bash
   cd next-app
   REPORT=example-polis npm run build
   ```

   - PythonのHTTPサーバーを使用してレポートを表示します。

   ```bash
   cd pipeline/outputs/example-polis/report
   python -m http.server 8000
   ```

   ブラウザで`http://localhost:8000`を開きます。
