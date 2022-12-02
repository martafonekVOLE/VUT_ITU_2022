<?php
    if(isset($_POST['submitted'])){
        $name = $_POST['name'];
        $category = $_POST['category'];
        $ingredients = $_POST['ingredients'];
        $img = $_POST['img'];
    }
    try{
        //TODO nastavit ukládání IMGs
        $data = file_get_contents('recipe.json');
        $json_arr = json_decode($data, true);
        //TODO auto increment
        $json_arr[] = array('id'=>4, 'name'=>$name, 'category'=>$category, 'ingredients'=>[  $ingredients ], 'photo'=>$img);
        file_put_contents('recipe.json', json_encode($json_arr));
    }
    catch(Exception $e){
        echo "Error has occured while inserting to JSON.";
        redirect('createRecipe.html');
    }
    redirect('index.html');

function redirect($url)
{
    $string = '<script type="text/javascript">';
    $string .= 'window.location = "' . $url . '"';
    $string .= '</script>';

    echo $string;
}


?>