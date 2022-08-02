import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    for (let i = 1; i <= 12; i++) {
      await Profile.create({
        user_id: i,
        address: 'Bululanjang, Sangkapura, Gresik, Jawa Timur',
        phone: '+6289517671541',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Egestas erat imperdiet sed euismod nisi. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Platea dictumst vestibulum rhoncus est. Vulputate odio ut enim blandit. Sed sed risus pretium quam vulputate dignissim suspendisse. Habitant morbi tristique senectus et netus et. Id venenatis a condimentum vitae sapien. Ut morbi tincidunt augue interdum velit euismod in. Integer eget aliquet nibh praesent tristique magna sit amet purus. Cursus mattis molestie a iaculis at erat. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Ridiculus mus mauris vitae ultricies leo integer. Non tellus orci ac auctor augue mauris. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Viverra vitae congue eu consequat ac. Suspendisse in est ante in nibh mauris cursus mattis. Ultricies mi eget mauris pharetra et. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt.
        Urna porttitor rhoncus dolor purus non enim. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Morbi quis commodo odio aenean sed adipiscing diam. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Enim blandit volutpat maecenas volutpat. Dolor morbi non arcu risus. Sed pulvinar proin gravida hendrerit lectus. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Sem et tortor consequat id porta nibh. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Tempor orci dapibus ultrices in iaculis nunc sed augue. Sit amet dictum sit amet justo donec enim diam vulputate. Augue ut lectus arcu bibendum at varius vel pharetra. Quam viverra orci sagittis eu volutpat odio facilisis. Tellus elementum sagittis vitae et. Morbi leo urna molestie at elementum eu facilisis sed odio. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Mauris a diam maecenas sed enim ut sem viverra aliquet.
        Et tortor at risus viverra. Morbi quis commodo odio aenean. Auctor elit sed vulputate mi sit. Viverra vitae congue eu consequat. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Velit laoreet id donec ultrices tincidunt arcu non sodales. Pharetra et ultrices neque ornare. Massa eget egestas purus viverra accumsan in nisl. Sed arcu non odio euismod. In iaculis nunc sed augue lacus viverra.`,
      })
    }
  }
}
