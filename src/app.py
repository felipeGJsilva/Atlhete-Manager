from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(
    __name__,
    template_folder="views",      # <-- muda aqui
    static_folder="static"
)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///athlete_manager.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# Modelos
class Atleta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    esporte = db.Column(db.String(50), nullable=False)
    posicao = db.Column(db.String(50))
    idade = db.Column(db.Integer)
    altura = db.Column(db.Float)
    peso = db.Column(db.Float)
    foto = db.Column(db.Text, default="default")

class Treino(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(100), nullable=False)

class Avaliacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    forca = db.Column(db.Float, nullable=False)

class Competicao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento = db.Column(db.String(100), nullable=False)

class Meta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)

class Evolucao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    peso = db.Column(db.Float, nullable=False)

# Criar banco se não existir
with app.app_context():
    db.create_all()

# Rotas API para Atletas
@app.route('/api/atletas', methods=['GET'])
def get_atletas():
    atletas = Atleta.query.all()
    return jsonify([{
        'id': a.id,
        'nome': a.nome,
        'esporte': a.esporte,
        'posicao': a.posicao,
        'idade': a.idade,
        'altura': a.altura,
        'peso': a.peso,
        'foto': a.foto
    } for a in atletas])

@app.route('/api/atletas', methods=['POST'])
def add_atleta():
    data = request.json
    atleta = Atleta(
        nome=data['nome'],
        esporte=data['esporte'],
        posicao=data.get('posicao'),
        idade=data.get('idade'),
        altura=data.get('altura'),
        peso=data.get('peso'),
        foto=data.get('foto', 'default')
    )
    db.session.add(atleta)
    db.session.commit()
    return jsonify({'id': atleta.id}), 201

@app.route('/api/atletas/<int:id>', methods=['PUT'])
def update_atleta(id):
    atleta = Atleta.query.get_or_404(id)
    data = request.json
    atleta.nome = data['nome']
    atleta.esporte = data['esporte']
    atleta.posicao = data.get('posicao')
    atleta.idade = data.get('idade')
    atleta.altura = data.get('altura')
    atleta.peso = data.get('peso')
    atleta.foto = data.get('foto', atleta.foto)
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/atletas/<int:id>', methods=['DELETE'])
def delete_atleta(id):
    atleta = Atleta.query.get_or_404(id)
    db.session.delete(atleta)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/treinos', methods=['GET'])
def get_treinos():
    treinos = Treino.query.all()
    return jsonify([{'id': t.id, 'tipo': t.tipo} for t in treinos])

@app.route('/api/treinos', methods=['POST'])
def add_treino():
    data = request.json
    treino = Treino(tipo=data['tipo'])
    db.session.add(treino)
    db.session.commit()
    return jsonify({'id': treino.id}), 201

@app.route('/api/treinos/<int:id>', methods=['PUT'])
def update_treino(id):
    treino = Treino.query.get_or_404(id)
    data = request.json
    treino.tipo = data['tipo']
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/treinos/<int:id>', methods=['DELETE'])
def delete_treino(id):
    treino = Treino.query.get_or_404(id)
    db.session.delete(treino)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/avaliacoes', methods=['GET'])
def get_avaliacoes():
    avaliacoes = Avaliacao.query.all()
    return jsonify([{'id': a.id, 'forca': a.forca} for a in avaliacoes])

@app.route('/api/avaliacoes', methods=['POST'])
def add_avaliacao():
    data = request.json
    avaliacao = Avaliacao(forca=data['forca'])
    db.session.add(avaliacao)
    db.session.commit()
    return jsonify({'id': avaliacao.id}), 201

@app.route('/api/avaliacoes/<int:id>', methods=['PUT'])
def update_avaliacao(id):
    avaliacao = Avaliacao.query.get_or_404(id)
    data = request.json
    avaliacao.forca = data['forca']
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/avaliacoes/<int:id>', methods=['DELETE'])
def delete_avaliacao(id):
    avaliacao = Avaliacao.query.get_or_404(id)
    db.session.delete(avaliacao)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/competicoes', methods=['GET'])
def get_competicoes():
    competicoes = Competicao.query.all()
    return jsonify([{'id': c.id, 'evento': c.evento} for c in competicoes])

@app.route('/api/competicoes', methods=['POST'])
def add_competicao():
    data = request.json
    competicao = Competicao(evento=data['evento'])
    db.session.add(competicao)
    db.session.commit()
    return jsonify({'id': competicao.id}), 201

@app.route('/api/competicoes/<int:id>', methods=['PUT'])
def update_competicao(id):
    competicao = Competicao.query.get_or_404(id)
    data = request.json
    competicao.evento = data['evento']
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/competicoes/<int:id>', methods=['DELETE'])
def delete_competicao(id):
    competicao = Competicao.query.get_or_404(id)
    db.session.delete(competicao)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/metas', methods=['GET'])
def get_metas():
    metas = Meta.query.all()
    return jsonify([{'id': m.id, 'titulo': m.titulo} for m in metas])

@app.route('/api/metas', methods=['POST'])
def add_meta():
    data = request.json
    meta = Meta(titulo=data['titulo'])
    db.session.add(meta)
    db.session.commit()
    return jsonify({'id': meta.id}), 201

@app.route('/api/metas/<int:id>', methods=['PUT'])
def update_meta(id):
    meta = Meta.query.get_or_404(id)
    data = request.json
    meta.titulo = data['titulo']
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/metas/<int:id>', methods=['DELETE'])
def delete_meta(id):
    meta = Meta.query.get_or_404(id)
    db.session.delete(meta)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/evolucao', methods=['GET'])
def get_evolucao():
    evolucoes = Evolucao.query.all()
    return jsonify([{'id': e.id, 'peso': e.peso} for e in evolucoes])

@app.route('/api/evolucao', methods=['POST'])
def add_evolucao():
    data = request.json
    evolucao = Evolucao(peso=data['peso'])
    db.session.add(evolucao)
    db.session.commit()
    return jsonify({'id': evolucao.id}), 201

@app.route('/api/evolucao/<int:id>', methods=['PUT'])
def update_evolucao(id):
    evolucao = Evolucao.query.get_or_404(id)
    data = request.json
    evolucao.peso = data['peso']
    db.session.commit()
    return jsonify({'message': 'Updated'})

@app.route('/api/evolucao/<int:id>', methods=['DELETE'])
def delete_evolucao(id):
    evolucao = Evolucao.query.get_or_404(id)
    db.session.delete(evolucao)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

# Rotas de template
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
