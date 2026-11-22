import { StyleSheet, Text, View } from 'react-native';

export function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Ласкаво просимо до Little Lemon</Text>

            <Text style={styles.paragraph}>
                Little Lemon — це затишне сімейне бістро середземноморської кухні, де
                традиційні рецепти поєднуються із сучасною подачею. Ми готуємо кожну
                страву зі свіжих локальних продуктів, оливкової олії першого віджиму та
                ароматних спецій, привезених із узбережжя Середземного моря.
            </Text>

            <Text style={styles.subheading}>Наші фірмові страви</Text>
            <Text style={styles.paragraph}>
                У нашому меню ви знайдете хрусткі брускети з томатами та базиліком,
                класичний грецький салат із витриманою фетою, хумус власного
                приготування, а також запеченого морського окуня з лимоном і чебрецем.
                Особливою гордістю закладу є домашня паста та десерти за родинними
                рецептами, зокрема фірмовий лимонний пиріг.
            </Text>

            <Text style={styles.subheading}>Чим ми вирізняємося</Text>
            <Text style={styles.paragraph}>
                Ми не використовуємо напівфабрикати й оновлюємо сезонні пропозиції
                щомісяця залежно від врожаю фермерських господарств. На відкритій кухні
                гості можуть спостерігати за приготуванням страв на грилі та випіканням
                свіжого хліба у кам’яній печі.
            </Text>

            <Text style={styles.subheading}>Для кого і коли ми працюємо</Text>
            <Text style={styles.paragraph}>
                Бістро створене для спокійних сімейних обідів, дружніх зустрічей і
                теплих вечірніх вечерь. Ми відкриті щодня з 10:00 до 22:00, а у
                вихідні пропонуємо спеціальне меню пізніх сніданків зі свіжозвареною
                кавою та домашнім лимонадом.
            </Text>

            <Text style={styles.paragraph}>
                Завітайте до Little Lemon, щоб відчути справжню гостинність, легку
                атмосферу та смак сонячного Середземномор’я в самому центрі міста.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#EDEFEE',
        textAlign: 'center',
        marginBottom: 20,
    },
    subheading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#EE9972',
        marginTop: 8,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 17,
        lineHeight: 25,
        color: '#EDEFEE',
        marginBottom: 16,
    },
});