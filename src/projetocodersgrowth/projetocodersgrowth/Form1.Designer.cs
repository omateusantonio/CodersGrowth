namespace projetocodersgrowth
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            DataGridView = new DataGridView();
            nomeDoAnimalDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            nomeDaEspecieDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            idDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            dataDoResgateDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            classeDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            emExtincaoDataGridViewCheckBoxColumn = new DataGridViewCheckBoxColumn();
            custoDeVacinacaoDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            animalSilvestreBindingSource = new BindingSource(components);
            BotaoAdicionar = new Button();
            BotaoEditar = new Button();
            BotaoRemover = new Button();
            animalSilvestreBindingSource1 = new BindingSource(components);
            nomeDoAnimalDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            nomeDaEspecieDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            idDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            dataDoResgateDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            classeDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            emExtincaoDataGridViewCheckBoxColumn1 = new DataGridViewCheckBoxColumn();
            custoDeVacinacaoDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)DataGridView).BeginInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource).BeginInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource1).BeginInit();
            SuspendLayout();
            // 
            // DataGridView
            // 
            DataGridView.AutoGenerateColumns = false;
            DataGridView.Columns.AddRange(new DataGridViewColumn[] { nomeDoAnimalDataGridViewTextBoxColumn1, nomeDaEspecieDataGridViewTextBoxColumn1, idDataGridViewTextBoxColumn1, dataDoResgateDataGridViewTextBoxColumn1, classeDataGridViewTextBoxColumn1, emExtincaoDataGridViewCheckBoxColumn1, custoDeVacinacaoDataGridViewTextBoxColumn1 });
            DataGridView.DataSource = animalSilvestreBindingSource1;
            DataGridView.Dock = DockStyle.Top;
            DataGridView.Location = new Point(0, 0);
            DataGridView.Name = "DataGridView";
            DataGridView.Size = new Size(800, 346);
            DataGridView.TabIndex = 4;
            // 
            // nomeDoAnimalDataGridViewTextBoxColumn
            // 
            nomeDoAnimalDataGridViewTextBoxColumn.DataPropertyName = "NomeDoAnimal";
            nomeDoAnimalDataGridViewTextBoxColumn.HeaderText = "NomeDoAnimal";
            nomeDoAnimalDataGridViewTextBoxColumn.Name = "nomeDoAnimalDataGridViewTextBoxColumn";
            // 
            // nomeDaEspecieDataGridViewTextBoxColumn
            // 
            nomeDaEspecieDataGridViewTextBoxColumn.DataPropertyName = "NomeDaEspecie";
            nomeDaEspecieDataGridViewTextBoxColumn.HeaderText = "NomeDaEspecie";
            nomeDaEspecieDataGridViewTextBoxColumn.Name = "nomeDaEspecieDataGridViewTextBoxColumn";
            // 
            // idDataGridViewTextBoxColumn
            // 
            idDataGridViewTextBoxColumn.DataPropertyName = "Id";
            idDataGridViewTextBoxColumn.HeaderText = "Id";
            idDataGridViewTextBoxColumn.Name = "idDataGridViewTextBoxColumn";
            // 
            // dataDoResgateDataGridViewTextBoxColumn
            // 
            dataDoResgateDataGridViewTextBoxColumn.DataPropertyName = "DataDoResgate";
            dataDoResgateDataGridViewTextBoxColumn.HeaderText = "DataDoResgate";
            dataDoResgateDataGridViewTextBoxColumn.Name = "dataDoResgateDataGridViewTextBoxColumn";
            // 
            // classeDataGridViewTextBoxColumn
            // 
            classeDataGridViewTextBoxColumn.DataPropertyName = "Classe";
            classeDataGridViewTextBoxColumn.HeaderText = "Classe";
            classeDataGridViewTextBoxColumn.Name = "classeDataGridViewTextBoxColumn";
            // 
            // emExtincaoDataGridViewCheckBoxColumn
            // 
            emExtincaoDataGridViewCheckBoxColumn.DataPropertyName = "EmExtincao";
            emExtincaoDataGridViewCheckBoxColumn.HeaderText = "EmExtincao";
            emExtincaoDataGridViewCheckBoxColumn.Name = "emExtincaoDataGridViewCheckBoxColumn";
            // 
            // custoDeVacinacaoDataGridViewTextBoxColumn
            // 
            custoDeVacinacaoDataGridViewTextBoxColumn.DataPropertyName = "CustoDeVacinacao";
            custoDeVacinacaoDataGridViewTextBoxColumn.HeaderText = "CustoDeVacinacao";
            custoDeVacinacaoDataGridViewTextBoxColumn.Name = "custoDeVacinacaoDataGridViewTextBoxColumn";
            // 
            // BotaoAdicionar
            // 
            BotaoAdicionar.Location = new Point(500, 362);
            BotaoAdicionar.Name = "BotaoAdicionar";
            BotaoAdicionar.Size = new Size(75, 23);
            BotaoAdicionar.TabIndex = 1;
            BotaoAdicionar.Text = "Adicionar";
            BotaoAdicionar.UseVisualStyleBackColor = true;
            BotaoAdicionar.Click += BotaoAdicionar_Click;
            // 
            // BotaoEditar
            // 
            BotaoEditar.Location = new Point(603, 362);
            BotaoEditar.Name = "BotaoEditar";
            BotaoEditar.Size = new Size(75, 23);
            BotaoEditar.TabIndex = 2;
            BotaoEditar.Text = "Editar";
            BotaoEditar.UseVisualStyleBackColor = true;
            // 
            // BotaoRemover
            // 
            BotaoRemover.Location = new Point(701, 362);
            BotaoRemover.Name = "BotaoRemover";
            BotaoRemover.Size = new Size(75, 23);
            BotaoRemover.TabIndex = 3;
            BotaoRemover.Text = "Remover";
            BotaoRemover.UseVisualStyleBackColor = true;
            // 
            // animalSilvestreBindingSource1
            // 
            animalSilvestreBindingSource1.DataSource = typeof(CodersGrowthProjeto.Dominio.AnimalSilvestre);
            // 
            // nomeDoAnimalDataGridViewTextBoxColumn1
            // 
            nomeDoAnimalDataGridViewTextBoxColumn1.DataPropertyName = "NomeDoAnimal";
            nomeDoAnimalDataGridViewTextBoxColumn1.HeaderText = "NomeDoAnimal";
            nomeDoAnimalDataGridViewTextBoxColumn1.Name = "nomeDoAnimalDataGridViewTextBoxColumn1";
            // 
            // nomeDaEspecieDataGridViewTextBoxColumn1
            // 
            nomeDaEspecieDataGridViewTextBoxColumn1.DataPropertyName = "NomeDaEspecie";
            nomeDaEspecieDataGridViewTextBoxColumn1.HeaderText = "NomeDaEspecie";
            nomeDaEspecieDataGridViewTextBoxColumn1.Name = "nomeDaEspecieDataGridViewTextBoxColumn1";
            // 
            // idDataGridViewTextBoxColumn1
            // 
            idDataGridViewTextBoxColumn1.DataPropertyName = "Id";
            idDataGridViewTextBoxColumn1.HeaderText = "Id";
            idDataGridViewTextBoxColumn1.Name = "idDataGridViewTextBoxColumn1";
            // 
            // dataDoResgateDataGridViewTextBoxColumn1
            // 
            dataDoResgateDataGridViewTextBoxColumn1.DataPropertyName = "DataDoResgate";
            dataDoResgateDataGridViewTextBoxColumn1.HeaderText = "DataDoResgate";
            dataDoResgateDataGridViewTextBoxColumn1.Name = "dataDoResgateDataGridViewTextBoxColumn1";
            // 
            // classeDataGridViewTextBoxColumn1
            // 
            classeDataGridViewTextBoxColumn1.DataPropertyName = "Classe";
            classeDataGridViewTextBoxColumn1.HeaderText = "Classe";
            classeDataGridViewTextBoxColumn1.Name = "classeDataGridViewTextBoxColumn1";
            // 
            // emExtincaoDataGridViewCheckBoxColumn1
            // 
            emExtincaoDataGridViewCheckBoxColumn1.DataPropertyName = "EmExtincao";
            emExtincaoDataGridViewCheckBoxColumn1.HeaderText = "EmExtincao";
            emExtincaoDataGridViewCheckBoxColumn1.Name = "emExtincaoDataGridViewCheckBoxColumn1";
            // 
            // custoDeVacinacaoDataGridViewTextBoxColumn1
            // 
            custoDeVacinacaoDataGridViewTextBoxColumn1.DataPropertyName = "CustoDeVacinacao";
            custoDeVacinacaoDataGridViewTextBoxColumn1.HeaderText = "CustoDeVacinacao";
            custoDeVacinacaoDataGridViewTextBoxColumn1.Name = "custoDeVacinacaoDataGridViewTextBoxColumn1";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 428);
            Controls.Add(BotaoRemover);
            Controls.Add(BotaoEditar);
            Controls.Add(BotaoAdicionar);
            Controls.Add(DataGridView);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)DataGridView).EndInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource).EndInit();
            ((System.ComponentModel.ISupportInitialize)animalSilvestreBindingSource1).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView DataGridView;
        private Button BotaoAdicionar;
        private Button BotaoEditar;
        private Button BotaoRemover;
        private DataGridViewTextBoxColumn nomeDoAnimalDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn nomeDaEspecieDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn dataDoResgateDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn classeDataGridViewTextBoxColumn;
        private DataGridViewCheckBoxColumn emExtincaoDataGridViewCheckBoxColumn;
        private DataGridViewTextBoxColumn custoDeVacinacaoDataGridViewTextBoxColumn;
        private BindingSource animalSilvestreBindingSource;
        private DataGridViewTextBoxColumn nomeDoAnimalDataGridViewTextBoxColumn1;
        private DataGridViewTextBoxColumn nomeDaEspecieDataGridViewTextBoxColumn1;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn1;
        private DataGridViewTextBoxColumn dataDoResgateDataGridViewTextBoxColumn1;
        private DataGridViewTextBoxColumn classeDataGridViewTextBoxColumn1;
        private DataGridViewCheckBoxColumn emExtincaoDataGridViewCheckBoxColumn1;
        private DataGridViewTextBoxColumn custoDeVacinacaoDataGridViewTextBoxColumn1;
        private BindingSource animalSilvestreBindingSource1;
    }
}