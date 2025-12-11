from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder="views",      # <-- muda aqui
    static_folder="static"
)

@app.route("/")
def home():
    return render_template("base/base.html")  # funciona normalmente

@app.route("/competicoes")
def competicoes():
    return render_template("base/competicoes.html")  # funciona normalmente

@app.route("/atletas")
def atletas():
    return render_template("base/atletas.html")  # funciona normalmente


@app.route("/avaliacoes")
def avaliacoes():
    return render_template("base/avaliacoes.html")  # funciona normalmente


@app.route("/metas")
def metas():
    return render_template("base/metas.html")  # funciona normalmente


@app.route("/treinos")
def treinos():
    return render_template("base/treinos.html")  # funciona normalmente]

@app.route("/sobre")
def sobre():
    return render_template("base/sobre.html")  # funciona normalmente

@app.route("/evolucao")
def evolucao():
    return render_template("base/evolucao.html")  # funciona normalmente

if __name__ == "__main__": 
    app.run(debug=True)
