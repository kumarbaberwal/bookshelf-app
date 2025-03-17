// styles/home.styles.js
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 80,
    },
    header: {
        marginBottom: 20,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "JetBrainsMono-Medium",
        letterSpacing: 0.5,
        color: colors.primary,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
    },
    bookCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
    },
    bookHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    username: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    bookImageContainer: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
        backgroundColor: colors.border,
    },
    bookImage: {
        width: "100%",
        height: "100%",
    },
    bookDetails: {
        padding: 4,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.textPrimary,
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: "row",
        marginBottom: 8,
    },
    caption: {
        fontSize: 14,
        color: colors.textDark,
        marginBottom: 8,
        lineHeight: 20,
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        marginTop: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.textPrimary,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
    },
    footerLoader: {
        marginVertical: 20,
    },
});