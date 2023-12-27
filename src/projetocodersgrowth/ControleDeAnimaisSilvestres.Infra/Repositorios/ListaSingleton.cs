using ControleDeAnimaisSilvestres.Dominio.Objetos;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public sealed class ListaSingleton
    {
        private readonly List<AnimalSilvestre> _animais;
        private static ListaSingleton _instance = null;
        private static int id = 0;
        private static readonly object locker = new object();

        private ListaSingleton()
        {
            _animais = new List<AnimalSilvestre>();
        }

        public static ListaSingleton Instancia()
        {
            if (_instance != null)
            {
                return _instance;
            }

            lock (locker)
            {
                if (_instance == null)
                {
                    _instance = new ListaSingleton();
                }
            }

            return _instance;
        }

        public List<AnimalSilvestre> ObterTodos()
        {
            return _instance._animais;
        }

        public int Inserir(AnimalSilvestre animal)
        {
            animal.Id = id;
            _instance._animais.Add(animal);
            id++;

            return id;
        }

        public void Remover(AnimalSilvestre animalSelecionado)
        {
            _instance._animais.Remove(animalSelecionado);
        }
    }
}
