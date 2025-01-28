# 初めてのブロードリスニングガイド

このドキュメントは、初めてブロードリスニングに挑戦する人を想定したガイドです。

## 概要

このツール(*)は、コメントのCSVファイルを入力として受け取り、以下のようなHTMLレポートを生成するAIパイプラインです。

- 元のコメントから主要な議論を抽出
- 意味的な類似性に基づいて議論をクラスター化
- 各クラスターにラベルと要約を生成
- 各クラスター内の議論を探索するためのインタラクティブなマップを提供

(* 「このツール」はAI Objective Instituteが開発したTalk to the Cityから派生したものですが、Talk to the Cityにも2種類あり、またかなり大々的に書き換えているため、近々分かりやすい名前をつける予定です)

## 必要なもの

- OpenAIのAPIキー
- PythonとJavaScriptを実行できるマシン

Python 3.10以上が必要です。Pythonのバージョン管理にはpyenvを使用することをお勧めします。

## Windowsユーザ向けDockerセットアップ

WindowsユーザはMacやLinuxと比較して環境構築で迷いやすいです。Dockerを使用して比較的マシに環境をセットアップできます。
[Windowsユーザ向けDockerセットアップ](for_windows_user.md)を参照。

## その他の環境でのセットアップ

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

4. **レポートの表示**

   - PythonのHTTPサーバーを使用してレポートを表示します。

   ```bash
   cd pipeline/outputs/example-polis/report
   python -m http.server 8000
   ```

   ブラウザで`http://localhost:8000`を開きます。
