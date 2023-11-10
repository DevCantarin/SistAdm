const secoes = [
  {
    id: 1,
    titulo: 'Insira alguns dados básicos',
    entradaTexto: [
      {
        id: 1,
        label: 'Nome',
        placeholder: 'Digite seu QRA',
        name: 'nome'
      },
      {
        id: 2,
        label: 'Email',
        placeholder: 'Digite seu email',
        name: 'email'
      },
      {
        id: 3,
        label: 'Crie uma senha',
        placeholder: 'Insira sua senha',
        secureTextEntry: true,
        name: 'senha'
      },
      {
        id: 4,
        label: 'Confirme sua senha',
        placeholder: 'Insira sua senha',
        secureTextEntry: true,
        name: 'confirmaSenha'
      },
      // {
      //   id: 5,
      //   label: 'CPF',
      //   placeholder: 'Insira seu CPF',
      //   name: 'cpf'
      // },
      // {
      //   id: 6,
      //   label: 'Foto de perfil',
      //   placeholder: 'Link da foto',
      //   name: 'imagem'
      // }
    ],
    checkbox: []
  },
  {
    id: 2,
    titulo: 'Agora, mais alguns dados sobre você:',
    entradaTexto: [
      {
        id: 1,
        label: 'Nome Completo',
        placeholder: 'Insira seu nome Completo',
        name: 'nome_completo'
      },
      {
        id: 2,
        label: 'Posto ou Graduação',
        placeholder: 'Insira seu Posto ou sua Graduação',
        name: 'grad'
      },
      {
        id: 3,
        label: 'Registro Estatistico',
        placeholder: 'Insira deu RE sem o digito',
        name: 're'
      },
      {
        id: 4,
        label: 'Digito',
        placeholder: 'Insira o Digito do seu RE',
        name: 'dig'
      },
      {
        id: 5,
        label: 'Função ou Pelotão',
        placeholder: 'Insira sua função administrativa ou pelotão',
        name: 'funcao'
      },
      {
        id: 6,
        label: 'Nome do Pai',
        placeholder: 'Insira o nome Completo do seu PAI',
        name: 'pai'
      },
      {
        id: 7,
        label: 'Nome da Mãe',
        placeholder: 'Insira o nome Completo da sua Mãe',
        name: 'mae'
      },
      {
        id: 8,
        label: 'Data de Admissão',
        placeholder: 'Insira sua data de Admissão na Meganha',
        name: 'admissao'
      },
      {
        id: 9,
        label: 'Data de Nascimento',
        placeholder: 'Insira sua data de Nascimento',
        name: 'nascimento'
      },
      {
        id: 10,
        label: 'Naturalidade',
        placeholder: 'Insira a cidade onde você Nasceu',
        name: 'cidade'
      },
      {
        id: 11,
        label: 'Estado',
        placeholder: 'Insira o Estado onde vc Nasceu',
        name: 'estado'
      },
      {
        id: 12,
        label: 'Conjuge',
        placeholder: 'Insira o nome do seu Conjuge (se houver)',
        name: 'conjuge'
      },
      {
        id: 13,
        label: 'Numero de Depentendes',
        placeholder: 'Insira o numero de Depentendes',
        name: 'dependentes'
      },
      {
        id: 14,
        label: 'Tipo Sanguineo',
        placeholder: 'Insira seu tipo sanguieno com fator Rh',
        name: 'sangue'
      },
      {
        id: 15,
        label: 'Cutis',
        placeholder: 'Insira a cor da sua cutis',
        name: 'cor'
      },
      {
        id: 16,
        label: 'Cor dos Olhos',
        placeholder: 'Insira a cor dos seus olhos',
        name: 'olhos'
      },
      {
        id: 17,
        label: 'Tipo de Cabelo',
        placeholder: 'Insira o tipo e cor do seu cabelo',
        name: 'cabelos'
      },
      {
        id: 18,
        label: 'Bigodes',
        placeholder: 'Insira o tipo de Bigodes',
        name: 'bigodes'
      },
      {
        id: 19,
        label: 'Cadastro de Pessoa Fisica',
        placeholder: 'Insira o seu CPF',
        name: 'cpf'
      },
      {
        id: 20,
        label: 'Registro Geral',
        placeholder: 'Insira o seu RG',
        name: 'rg'
      },
      {
        id: 21,
        label: 'PASEP',
        placeholder: 'Insira o PASEP (se Houver)',
        name: 'pasep'
      },
      {
        id: 22,
        label: 'Pis',
        placeholder: 'Insira o PIS',
        name: 'pis'
      },
      {
        id: 23,
        label: 'Carteira de Trabalho',
        placeholder: 'Insira o número da sua Carteira de Trabalhlo',
        name: 'carteira_trabalho'
      },
      {
        id: 24,
        label: 'Carteira Nacional de Habilitação',
        placeholder: 'Insira o número da sua CNH',
        name: 'cnh'
      },
      {
        id: 25,
        label: 'Validade da CNH',
        placeholder: 'Insira a data de Validade da Sua CNH',
        name: 'val'
      },
      {
        id: 26,
        label: 'Categoria da CNH',
        placeholder: 'Insira a categoria da sua CNH',
        name: 'cat'
      },
      {
        id: 27,
        label: 'Seção de Apoio de Transporte',
        placeholder: 'Insira a categoria do seu SAT',
        name: 'sat'
      },
      {
        id: 28,
        label: 'Endereço',
        placeholder: 'Nome da Rua e complementos',
        name: 'residencia'
      },
      {
        id: 29,
        label: 'Bairro',
        placeholder: 'Insira o Bairro da sua Residencia',
        name: 'bairro'
      },
      {
        id: 30,
        label: 'Código de Endereço Postal',
        placeholder: 'Insira o CEP da sua Residencia',
        name: 'cep'
      },
      {
        id: 31,
        label: 'Telefone',
        placeholder: 'Insira o seu Telefone',
        name: 'telefone'
      },
    ],
    checkbox: []
  },
  // {
  //   id: 3,
  //   titulo: 'Para finalizar, quais são os seus planos?',
  //   entradaTexto: [],
  //   checkbox: [
  //     {
  //       id: 1,
  //       value: 'Sulamerica'
  //     },
  //     {
  //       id: 2,
  //       value: 'Unimed'
  //     },
  //     {
  //       id: 3,
  //       value: 'Bradesco'
  //     },
  //     {
  //       id: 4,
  //       value: 'Amil'
  //     },
  //     {
  //       id: 5,
  //       value: 'Biosaúde'
  //     },
  //     {
  //       id: 6,
  //       value: 'Biovida'
  //     },
  //     {
  //       id: 7,
  //       value: 'Outros'
  //     }
  //   ]
  // }
]

export { secoes }