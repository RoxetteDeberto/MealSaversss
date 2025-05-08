-- Insert sample charities
INSERT INTO public.charities (name, description, image_url, location, contact_email, contact_phone, website, status)
VALUES
    (
        'Food Bank of Hope',
        'Providing essential food supplies to families in need across the community. We focus on fresh produce and nutritious meals.',
        'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3',
        '123 Main Street, City Center',
        'contact@foodbankofhope.org',
        '(555) 123-4567',
        'https://foodbankofhope.org',
        'active'
    ),
    (
        'Community Kitchen',
        'Serving hot meals and providing food education programs to help families achieve food security.',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3',
        '456 Oak Avenue, Downtown',
        'info@communitykitchen.org',
        '(555) 234-5678',
        'https://communitykitchen.org',
        'active'
    ),
    (
        'Harvest Share',
        'Connecting local farmers with food banks to reduce food waste and provide fresh produce to those in need.',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3',
        '789 Pine Road, Suburbia',
        'help@harvestshare.org',
        '(555) 345-6789',
        'https://harvestshare.org',
        'active'
    ),
    (
        'Meals on Wheels',
        'Delivering nutritious meals to homebound seniors and individuals with disabilities.',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3',
        '321 Elm Street, Westside',
        'contact@mealsonwheels.org',
        '(555) 456-7890',
        'https://mealsonwheels.org',
        'active'
    ),
    (
        'Food Rescue Network',
        'Rescuing surplus food from restaurants and grocery stores to distribute to those in need.',
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3',
        '654 Maple Drive, Eastside',
        'info@foodrescuenetwork.org',
        '(555) 567-8901',
        'https://foodrescuenetwork.org',
        'active'
    ); 