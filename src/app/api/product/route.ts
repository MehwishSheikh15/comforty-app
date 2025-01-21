

import { NextResponse } from 'next/server';


export async function GET() {
  try {
  
    const products = [
      { id: 1, image: '/product1.png', name: 'Comfort Chair', price: '$99.99', priceNumeric: 99.99, description: 'A comfortable chair for long hours of sitting.', size: 'L' },
      { id: 2, image: '/product2.png', name: 'Modern Office Chair', price: '$129.99', priceNumeric: 129.99, description: 'A stylish chair that suits any modern office.', size: 'Sm'  },
      { id: 3, image: '/product3.png', name: 'Ergonomic Chair', price: '$149.99', priceNumeric: 149.99, description: 'Designed for ergonomic comfort.', size: 'L'  },
      { id: 4, image: '/product4.png', name: 'Executive Leather Chair', price: '$199.99', priceNumeric: 199.99, description: 'A luxurious leather chair for executives.', size: 'L'  },
      { id: 5, image: '/product5.png', name: 'Reclining Chair', price: '$249.99', priceNumeric: 249.99, description: 'Perfect for relaxing and reclining.', size: 'L'  },
      { id: 6, image: '/product6.png', name: 'Adjustable Desk Chair', price: '$179.99', priceNumeric: 179.99, description: 'An adjustable chair for desk work.', size: 'Sm'  },
      { id: 7, image: '/product7.png', name: 'Mesh Office Chair', price: '$89.99', priceNumeric: 89.99, description: 'A breathable mesh chair for office use.', size: 'L'  },
      { id: 8, image: '/product8.png', name: 'Swivel Chair', price: '$109.99', priceNumeric: 109.99, description: 'A versatile swivel chair for any workspace.', size: 'L'  },
      { id: 9, image: '/category1.png', name: 'Task Chair', price: '$79.99', priceNumeric: 79.99, description: 'A task chair for everyday office work.', size: 'L'  },
      { id: 10, image: '/category2.png', name: 'High Back Chair', price: '$159.99', priceNumeric: 159.99, description: 'A high back chair for full back support.', size: 'L'  },
      { id: 11, image: '/category3.png', name: 'Gaming Chair', price: '$299.99', priceNumeric: 299.99, description: 'A gaming chair with excellent support.', size: 'MD'  },
      { id: 12, image: '/product1.png', name: 'Rocking Chair', price: '$119.99', priceNumeric: 119.99, description: 'A rocking chair for ultimate relaxation.', size: 'Sm'  },
    ];

    console.log('Returning products:', products); 
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error();
  }
}
