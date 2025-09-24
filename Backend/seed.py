from app import app
from models import db, Car, Admin, Showroom

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create one showroom
    showroom = Showroom(name="Main Showroom", location="Nairobi")
    db.session.add(showroom)
    db.session.commit() 

    sample_cars = [  
        Car(name="Toyota Corolla", price=10000, year=2018, type="Sedan", image_url="https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Honda Civic", price=12000, year=2019, type="Sedan", image_url="https://images.unsplash.com/photo-1605816988069-b11383b50717?q=80&w=888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Toyota Land Cruiser", price=50000, year=2020, type="SUV", image_url="https://images.unsplash.com/photo-1650530579355-7ad9d4766043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Nissan X-Trail", price=20000, year=2018, type="SUV", image_url="https://images.unsplash.com/photo-1742697167580-af91e3ead35e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Volkswagen Golf", price=15000, year=2017, type="Hatchback", image_url="https://images.unsplash.com/photo-1678120609593-1e86e6a631b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Mazda 2", price=14000, year=2019, type="Hatchback", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqqyDyCnuJe5BoxVpAazmFSIdL1J02YHnpEQ&s"),  
        Car(name="Ford F-150", price=55000, year=2021, type="Truck", image_url="https://images.unsplash.com/photo-1711512302274-8aafe96481bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),  
        Car(name="Isuzu D-Max", price=40000, year=2020, type="Truck", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGxyp46ClCXn8oLUPP4F2CG7PV4mM5EvGgg&s"),  
        Car(name="BMW 4 Series", price=45000, year=2019, type="Coupe", image_url="https://www.bmw.co.za/content/dam/bmw/common/all-models/4-series/gran-coupe/2024/navigation/bmw-4-series-gran-coupe-modelfinder.png"),  
        Car(name="Toyota Hiace", price=25000, year=2018, type="Van", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYNwXk-kAz8l28r3rLF2MO4NxWvybtM0xF1A&s")  
    ]  

    db.session.bulk_save_objects(sample_cars) 
    
    admin1 = Admin(username="admin1", showroom_id=showroom.id)
    admin1.set_password("password123")
    admin2 = Admin(username="admin2", showroom_id=showroom.id)
    admin2.set_password("password456")
    db.session.add_all([admin1, admin2]) 
    
    db.session.commit()  

    print("Database seeded with sample cars!")  

