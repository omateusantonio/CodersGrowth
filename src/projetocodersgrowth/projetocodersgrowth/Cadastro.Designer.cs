using ControleDeAnimaisSilvestres.Dominio.Objetos;

namespace ControleDeAnimaisSilvestres
{
    partial class Cadastro
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            BotaoAdicionarAnimal = new Button();
            BotaoCancelar = new Button();
            GrupoCamposNovoAnimal = new GroupBox();
            CaixaDeTextoPrecoDaVacinacao = new TextBox();
            ChecaAnimalEmExtincao = new CheckBox();
            RotuloPrecoDaVacinacao = new Label();
            ComboBoxClasseDeAnimal = new ComboBox();
            SelecaoDataDoResgate = new DateTimePicker();
            RotuloClasseDeAnimal = new Label();
            RotuloDataDoResgate = new Label();
            RotuloEspecieDoAnimal = new Label();
            RotuloNomeDoAnimal = new Label();
            CaixaDeTextoEspecieDoAnimal = new TextBox();
            CaixaDeTextoNomeDoAnimal = new TextBox();
            animalSilvestreBindingSource = new BindingSource(components);
            animalSilvestreBindingSource1 = new BindingSource(components);
            contextMenuStrip1 = new ContextMenuStrip(components);
            GrupoCamposNovoAnimal.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource).BeginInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource1).BeginInit();
            SuspendLayout();
            // 
            // BotaoAdicionarAnimal
            // 
            BotaoAdicionarAnimal.Location = new Point(32, 361);
            BotaoAdicionarAnimal.Name = "BotaoAdicionarAnimal";
            BotaoAdicionarAnimal.Size = new Size(100, 23);
            BotaoAdicionarAnimal.TabIndex = 9;
            BotaoAdicionarAnimal.Text = "Adicionar animal";
            BotaoAdicionarAnimal.UseVisualStyleBackColor = true;
            BotaoAdicionarAnimal.Click += AoClicarEmAdicionar;
            // 
            // BotaoCancelar
            // 
            BotaoCancelar.Location = new Point(197, 361);
            BotaoCancelar.Name = "BotaoCancelar";
            BotaoCancelar.Size = new Size(113, 23);
            BotaoCancelar.TabIndex = 10;
            BotaoCancelar.Text = "Cancelar";
            BotaoCancelar.UseVisualStyleBackColor = true;
            BotaoCancelar.Click += AoClicarEmCancelar;
            // 
            // GrupoCamposNovoAnimal
            // 
            GrupoCamposNovoAnimal.Controls.Add(CaixaDeTextoPrecoDaVacinacao);
            GrupoCamposNovoAnimal.Controls.Add(ChecaAnimalEmExtincao);
            GrupoCamposNovoAnimal.Controls.Add(RotuloPrecoDaVacinacao);
            GrupoCamposNovoAnimal.Controls.Add(ComboBoxClasseDeAnimal);
            GrupoCamposNovoAnimal.Controls.Add(SelecaoDataDoResgate);
            GrupoCamposNovoAnimal.Controls.Add(RotuloClasseDeAnimal);
            GrupoCamposNovoAnimal.Controls.Add(RotuloDataDoResgate);
            GrupoCamposNovoAnimal.Controls.Add(RotuloEspecieDoAnimal);
            GrupoCamposNovoAnimal.Controls.Add(RotuloNomeDoAnimal);
            GrupoCamposNovoAnimal.Controls.Add(CaixaDeTextoEspecieDoAnimal);
            GrupoCamposNovoAnimal.Controls.Add(CaixaDeTextoNomeDoAnimal);
            GrupoCamposNovoAnimal.Location = new Point(12, 12);
            GrupoCamposNovoAnimal.Name = "GrupoCamposNovoAnimal";
            GrupoCamposNovoAnimal.Size = new Size(307, 335);
            GrupoCamposNovoAnimal.TabIndex = 1;
            GrupoCamposNovoAnimal.TabStop = false;
            GrupoCamposNovoAnimal.Text = "Novo Animal";
            // 
            // CaixaDeTextoPrecoDaVacinacao
            // 
            CaixaDeTextoPrecoDaVacinacao.Location = new Point(156, 220);
            CaixaDeTextoPrecoDaVacinacao.Name = "CaixaDeTextoPrecoDaVacinacao";
            CaixaDeTextoPrecoDaVacinacao.Size = new Size(142, 23);
            CaixaDeTextoPrecoDaVacinacao.TabIndex = 8;
            // 
            // ChecaAnimalEmExtincao
            // 
            ChecaAnimalEmExtincao.AutoSize = true;
            ChecaAnimalEmExtincao.Location = new Point(18, 222);
            ChecaAnimalEmExtincao.Name = "ChecaAnimalEmExtincao";
            ChecaAnimalEmExtincao.Size = new Size(96, 19);
            ChecaAnimalEmExtincao.TabIndex = 7;
            ChecaAnimalEmExtincao.Text = "Em extinção?";
            ChecaAnimalEmExtincao.UseVisualStyleBackColor = true;
            // 
            // RotuloPrecoDaVacinacao
            // 
            RotuloPrecoDaVacinacao.AutoSize = true;
            RotuloPrecoDaVacinacao.Location = new Point(156, 200);
            RotuloPrecoDaVacinacao.Name = "RotuloPrecoDaVacinacao";
            RotuloPrecoDaVacinacao.Size = new Size(109, 15);
            RotuloPrecoDaVacinacao.TabIndex = 4;
            RotuloPrecoDaVacinacao.Text = "Preço da vacinação";
            // 
            // ComboBoxClasseDeAnimal
            // 
            ComboBoxClasseDeAnimal.DropDownStyle = ComboBoxStyle.DropDownList;
            ComboBoxClasseDeAnimal.FormattingEnabled = true;
            ComboBoxClasseDeAnimal.Location = new Point(156, 165);
            ComboBoxClasseDeAnimal.Name = "ComboBoxClasseDeAnimal";
            ComboBoxClasseDeAnimal.Size = new Size(142, 23);
            ComboBoxClasseDeAnimal.TabIndex = 3;
            // 
            // SelecaoDataDoResgate
            // 
            SelecaoDataDoResgate.CustomFormat = "dd/MM/yyyy";
            SelecaoDataDoResgate.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point);
            SelecaoDataDoResgate.Format = DateTimePickerFormat.Custom;
            SelecaoDataDoResgate.Location = new Point(18, 165);
            SelecaoDataDoResgate.Name = "SelecaoDataDoResgate";
            SelecaoDataDoResgate.Size = new Size(112, 23);
            SelecaoDataDoResgate.TabIndex = 2;
            // 
            // RotuloClasseDeAnimal
            // 
            RotuloClasseDeAnimal.AutoSize = true;
            RotuloClasseDeAnimal.Location = new Point(156, 147);
            RotuloClasseDeAnimal.Name = "RotuloClasseDeAnimal";
            RotuloClasseDeAnimal.Size = new Size(95, 15);
            RotuloClasseDeAnimal.TabIndex = 1;
            RotuloClasseDeAnimal.Text = "Classe de animal";
            // 
            // RotuloDataDoResgate
            // 
            RotuloDataDoResgate.AutoSize = true;
            RotuloDataDoResgate.Location = new Point(18, 147);
            RotuloDataDoResgate.Name = "RotuloDataDoResgate";
            RotuloDataDoResgate.Size = new Size(89, 15);
            RotuloDataDoResgate.TabIndex = 1;
            RotuloDataDoResgate.Text = "Data do resgate";
            // 
            // RotuloEspecieDoAnimal
            // 
            RotuloEspecieDoAnimal.AutoSize = true;
            RotuloEspecieDoAnimal.Location = new Point(18, 89);
            RotuloEspecieDoAnimal.Name = "RotuloEspecieDoAnimal";
            RotuloEspecieDoAnimal.Size = new Size(102, 15);
            RotuloEspecieDoAnimal.TabIndex = 1;
            RotuloEspecieDoAnimal.Text = "Espécie do animal";
            // 
            // RotuloNomeDoAnimal
            // 
            RotuloNomeDoAnimal.AutoSize = true;
            RotuloNomeDoAnimal.Location = new Point(18, 33);
            RotuloNomeDoAnimal.Name = "RotuloNomeDoAnimal";
            RotuloNomeDoAnimal.Size = new Size(96, 15);
            RotuloNomeDoAnimal.TabIndex = 1;
            RotuloNomeDoAnimal.Text = "Nome do animal";
            // 
            // CaixaDeTextoEspecieDoAnimal
            // 
            CaixaDeTextoEspecieDoAnimal.Location = new Point(18, 107);
            CaixaDeTextoEspecieDoAnimal.Name = "CaixaDeTextoEspecieDoAnimal";
            CaixaDeTextoEspecieDoAnimal.Size = new Size(280, 23);
            CaixaDeTextoEspecieDoAnimal.TabIndex = 1;
            // 
            // CaixaDeTextoNomeDoAnimal
            // 
            CaixaDeTextoNomeDoAnimal.Location = new Point(18, 51);
            CaixaDeTextoNomeDoAnimal.Name = "CaixaDeTextoNomeDoAnimal";
            CaixaDeTextoNomeDoAnimal.Size = new Size(280, 23);
            CaixaDeTextoNomeDoAnimal.TabIndex = 0;
            // 
            // animalSilvestreBindingSource
            // 
            animalSilvestreBindingSource.DataSource = typeof(AnimalSilvestre);
            // 
            // animalSilvestreBindingSource1
            // 
            animalSilvestreBindingSource1.DataSource = typeof(AnimalSilvestre);
            // 
            // contextMenuStrip1
            // 
            contextMenuStrip1.Name = "contextMenuStrip1";
            contextMenuStrip1.Size = new Size(61, 4);
            // 
            // Cadastro
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(331, 403);
            Controls.Add(GrupoCamposNovoAnimal);
            Controls.Add(BotaoCancelar);
            Controls.Add(BotaoAdicionarAnimal);
            Name = "Cadastro";
            Text = "Cadastro";
            GrupoCamposNovoAnimal.ResumeLayout(false);
            GrupoCamposNovoAnimal.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource).EndInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource1).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private Button BotaoAdicionarAnimal;
        private Button BotaoCancelar;
        private GroupBox GrupoCamposNovoAnimal;
        private Label RotuloNomeDoAnimal;
        private TextBox CaixaDeTextoNomeDoAnimal;
        private Label RotuloEspecieDoAnimal;
        private TextBox CaixaDeTextoEspecieDoAnimal;
        private DateTimePicker SelecaoDataDoResgate;
        private Label RotuloDataDoResgate;
        private Label RotuloClasseDeAnimal;
        private ComboBox ComboBoxClasseDeAnimal;
        private BindingSource animalSilvestreBindingSource;
        private BindingSource animalSilvestreBindingSource1;
        private ContextMenuStrip contextMenuStrip1;
        private Label RotuloPrecoDaVacinacao;
        private MaskedTextBox maskedTextBox1;
        private CheckBox ChecaAnimalEmExtincao;
        private TextBox CaixaDeTextoPrecoDaVacinacao;
    }
}