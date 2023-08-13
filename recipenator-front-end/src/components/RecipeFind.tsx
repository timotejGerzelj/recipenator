import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../@/components/ui/dialog"
  

const RecipeFind = ({ingredientsList}) => {
    return (
        <Dialog>
        <DialogTrigger>Find a Recipe</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>    
        </Dialog>
    );
}
export default RecipeFind;