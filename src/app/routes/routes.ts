export const routes = [

    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
    },
    // Not found
    {path: '**', redirectTo: 'map'}

];
