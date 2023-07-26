use clap::{
    Args, 
    Parser, 
    Subcommand
};

#[derive(Debug, Args)]
pub struct CreateRecipe {
    pub name: String, 
    pub instructions: String, 
    pub ingredients: Vec<String>
}
#[derive(Debug, Args)]
pub struct UpdateRecipe {
    pub id: i32,
    pub name: String,
    pub instructions: String, 
    pub ingredients: Vec<String>

}
#[derive(Debug, Args)]
pub struct DeleteRecipe {
    pub id: i32
}



#[derive(Debug, Subcommand)]
pub enum RecipeCommand {
    Create(CreateRecipe),
    Update(UpdateRecipe),
    Delete(DeleteRecipe),
    Show, 
}