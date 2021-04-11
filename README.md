# Stone Hero FullStack API
<center><a href="https://github.com/rodrigoazv"><img alt="Por: " src="https://img.shields.io/github/followers/rodrigoazv?style=social"></a>  <a href="https://www.linkedin.com/in/rodrigo-azevedo-30885a164/    "><img alt="Tecnologias" src="https://img.shields.io/node/v/latest"></a></center>

## 💻 Sobre o projeto

:beer: StoneHero - É uma conexão entre a API da marvel e um banco de dados local, no qual o usuário pode fazer login e ver toda a lista de characters e comics disponiveis na api, navegar entre eles e favorita-los.

Projeto foi desenvolvido como desafio tecnico a respeito da possibilidade de desenvolver as features nele especificadas.

## 🎨 Arquitetura e Tecnologias

A arquitetura da aplicação foi inspirada nos conceitos de clean architecture, buscando desacoplar conceitos e blocos, deixando o codigo altamente legível :

##### A API foi montada utilizando três projetos, cada um com sua funcionalidade evitando dependências entre elas e desta forma tornando-a mais funcional e segura.

| Requerimento       |  Tecnologia   |
|--------------------|---------------|
| Nodejs             | >= 10.0       |
| Postgresql         | >= 9.6        |
| Credentials Marvel | Any           |
| Credentials Marvel | Any           |


| Camadas        | Conteúdo                                           |Função                                   |
|----------------|----------------------------------------------------|-----------------------------------------|
| Controllers    |Controllers de Requesição, recebem requisição             | Controla a interação usuário e aplicação e envia os dados para os serviços |
| Services       |Serviços capazes de receber dados da controler            | Camada de acesso a dados                                                   |
| Helpers        |Funções e features de que são reutilizaveis               | Reuso de funções (Error handler por exemplo )                              |
| Schemas        |Tipagem dos dados referente a criação e inserção de dados | Centralizar uso de tipos                                                   |
| Entitys        |Declaração de modelos de entitidades no postgres          | Criar entidades no banco de dados                                          |

## 🚀 Como executar o projeto

💡É necessário ter o NODEJS>=10.0 e o postgresql instalado e configurado para acesso.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [.Nodejs](https://nodejs.org/en/) e um banco de dados [Postgresql](https://www.postgresql.org/).
Além disto caso queira por as mãos no código é bom ter um editor como o [VSCode.](https://code.visualstudio.com/)

Visto que seja feito a configuração de todas as variaveis de ambiente e criação de banco, você pode seguir o passo a passo.

API da marvel para pegar credênciais[.MarvelApi](https://developer.marvel.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/palomaarize/GuiaBar.git

# Acesse a pasta do projeto no terminal/cmd
$ cd hero-server

# Instale as dependências
$ yarn

# Crie migrações
$ yarn migration:generate NOME_DA_MIGRATION

# Rode migrações
$ yarn migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev:server

# O servidor inciará na porta:3333 - acesse http://localhost:3333 ou na porta configurada no env example

```

# Lançamentos Principais

Esta primeira versão contempla as seguintes features

    - Criar usuário
    - Login
    - Alterar usuário
    - Listar characters da marvel com ( Paginação, Search )
    - Listar comics da marvel com ( Paginação, Search )
    - Favoritar comics da marvel com 
    - Favoritar characters da marvel com ( Paginação, Search )
    - Desfavoritar comics da marvel com 
    - Desfavoritar characters da marvel com ( Paginação, Search )
    - Ver char ou comics individualmente
    - Ver favoritos comics e char

