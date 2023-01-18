<?php
$txtJson = file_get_contents('php://input') ;
$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($txtJson, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);
$claves = array();
$valores = array();
$list_fields = "";
$list_values ="";
$lx = 0;

foreach ($jsonIterator as $key => $val) {
    if(is_array($val)) {
    } else {
        array_push($claves,$key);
        array_push($valores,$val);
    }
}
$db_server = $valores[1];
$db_user = $valores[2];
$db_pass = $valores[3];
$db_name = $valores[4];
$db_serverport = $valores[5];

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');
$conn = new mysqli($db_server, $db_user,$db_pass,$db_name,$db_serverport);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}else{mysqli_set_charset($conn,'utf8'); echo "<h4 class='text-success'>Conectado a $db_server</h4>";}

switch ($valores[0]) {
    case 'conn':
      $sql = "SELECT TABLE_NAME AS nombre FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$db_name'";
      $result = $conn->query($sql);
      if (mysqli_num_rows($result) == true) {
          $lista_tablas = "<select name='table_name' id='table_name' class='form-control' onchange='enviaForm(".chr(34)."formularioData".chr(34).")'><option value=''>Seleccionar Tabla</option>";
          while ($row = $result->fetch_assoc()) {
              $nombreTabla = $row["nombre"];
              $lista_tablas .= "<option value='" . $nombreTabla . "'>" . $nombreTabla  . "</option>";
          }
      }
      $lista_tablas .= "</select>";
      echo "<form method='post' name='formularioData' id='formularioData'>
        <input type='hidden' name='cmd' id='cmd' value='tabla'>
        <input type='hidden' id='db_server' name='db_server' value = '$db_server'>
        <input type='hidden' id='db_user' name='db_user' value = '$db_user'>
        <input type='hidden' id='db_pass' name='db_pass' value = '$db_pass'>
        <input type='hidden' id='db_name' name='db_name' value = '$db_name'>
        <input type='hidden' id='db_serverport' name='db_serverport' value = '$db_serverport'>
        $lista_tablas
        </form>";
      break;
      case 'tabla':
        $sql = "SELECT COLUMN_NAME as campo,DATA_TYPE as datatype FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '$db_name' AND TABLE_NAME = '$valores[6]'";
        // echo $sql;
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) == true) {
          $lista_campos = "<table table class='table table-hover table-striped table-sm small'>";
          $lista_resultados = "<table class='table table-sm table-borderless table-secondary small text-success'>";
          $lista_php = "<table class='table table-sm table-borderless table-secondary small text-danger'>";
        while($row = $result->fetch_assoc())
          {
              $nombreCampo = $row["campo"];
              $datatype = $row["datatype"];
              $sugerido="";
              $listaInput = array("text","number","hidden","password","checkbox","radio","date","file","range","color","button","select","textarea");
              $lista_campos .= "<tr id='".$nombreCampo."Tr'><td>$nombreCampo <span class='text-secondary'>($datatype)</span></td>";
              foreach ($listaInput as $input) {
                  $lista_campos .= "<td><a href='javascript:void(0)' id='$nombreCampo$input' class='$sugerido' onclick='selectElement(".chr(34). $nombreCampo . chr(34) . ",". chr(34) .$input . chr(34) .")'>+ $input </a></td>";
              }
              $lista_campos .= "<td><a href='javascript:void(0)' id='$nombreCampo$input' class='text-danger fw-bold' onclick='clearElement(".chr(34). $nombreCampo . chr(34) . ")' disabled>X</a></td></tr>";
              $lista_resultados .= "<tr><td id='$nombreCampo'></td></tr>";
              $lista_php .= "<tr><td id='" . $nombreCampo . "_php'></td></tr>";
          }
        }
        $lista_campos .="</table>";
        $lista_resultados .= "</table>";
        $lista_php .= "</table>";

        echo "
              <div class='row'>
                <div class='col-md-12'>
                    <h2 class='text-center'>Form Generator for <span class='text-secondary'>$valores[6]</span></h2>
                    <h6 class='text-center'>Incluir clases de Bootstrap <input type='checkbox' class='form-check-input' id='bootstrap' checked></h6>
                </div>
              </div>
              <div class='row mt-1'>
                  <div class='col-md-12'>$lista_campos</div>
              </div>
              <div class='row'>
                  <div class='col-md-8'>$lista_resultados</div><div class='col-md-4'>$lista_php</div>
              </div>";
        break;
    default:
    echo 'Error de datos';
    break;
}
?>