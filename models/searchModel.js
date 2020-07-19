var pool = require('./bd');


// async function buscarGlobal(busqueda){
//     var query = "select distinct titulo, contenido, categoria, fecha, texto from noticias, novedades where titulo like ? or contenido like ? or categoria like ? or fecha like ? or texto like ?";
//     var rows = await pool.query(query, ['%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%' ]);
//     return rows;
// }

// module.exports ={ buscarGlobal }

async function buscarGlobal(busqueda){
    var queryNoticias = "select titulo, contenido, categoria from noticias where titulo like ? or contenido like ? or categoria like ? or fecha like ?";
    var queryNovedades = "select mes, texto from novedades where texto like ?";

    return {
        noticias: await pool.query(queryNoticias, ['%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%', '%'+ busqueda + '%' ]),
        novedades: await pool.query(queryNovedades, ['%'+ busqueda + '%'])
    };
}

module.exports ={ buscarGlobal }



//select * from noticias where titulo like ? or contenido like ? or categoria like ? or fecha like ? union select * from novedades where texto like ?