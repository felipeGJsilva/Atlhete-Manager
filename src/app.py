from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder="views",      # <-- muda aqui
    static_folder="static"
)

@app.route("/")
def home():
    return render_template("base/base.html")  # funciona normalmente

if __name__ == "__main__":
    app.run(debug=True)
