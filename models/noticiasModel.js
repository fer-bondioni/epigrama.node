var pool = require('./bd');
async function getNoticias() {
    var query = "select * from noticias order by id DESC limit 3";
    var rows = await pool.query(query);
    return rows;
}
async function getNoticias2() {
    var queryPrimera = "select * from noticias where id > 12 and id < 23 order by id DESC";
    var querySegunda = "select * from noticias where id > 22 order by id DESC";
    return {
        pepe : await pool.query(queryPrimera),
        pepeDos : await pool.query(querySegunda)
    }
}


async function insertNoticia(obj) {
    try{
        var query = "insert into noticias set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteNoticiasById(id) {
    var query = "delete from noticias where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNoticiasById(id){
    var query = "select * from noticias where id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}


async function getNoticiasByCategoria(){
    var queryDebates = "select * from noticias where categoria like 'Debates'";
    var queryDialogos = "select * from noticias where categoria like 'Diálogos'";

    return {
        debates: await pool.query(queryDebates),
        dialogos: await pool.query(queryDialogos)
    };
}

async function modificarNoticiabyId(obj, id){
    try{
        var query = "update noticias set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
}

async function buscarNoticias(busqueda){
    var query = "select * from noticias where titulo like ? or contenido like ? or categoria like ? or fecha like ?";
    var rows = await pool.query(query, ['%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%' ]);
    return rows;
}

module.exports ={ getNoticias, getNoticias2, insertNoticia, deleteNoticiasById, getNoticiasById, modificarNoticiabyId, 
    buscarNoticias, getNoticiasByCategoria }
